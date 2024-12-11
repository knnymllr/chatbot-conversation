from .models import *
from .serializers import *
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
import time
import openai

openai_api_key = ""
openai.api_key = openai_api_key

#! ¢¢ FOR CHEAP TESTING ¢¢
def ask_davinci(message):
    response = openai.completions.create(
        model='davinci-002',
        prompt=message,
        temperature=1,
        max_tokens=128,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )
    answer = response.choices[0].text.strip()
    return answer


# * $$ FOR PRODUCTION $$
def ask_chatgpt(message, prompt):
    response = openai.chat.completions.create(
        model='gpt-4',
        messages=[
            {'role': 'system', 'content': prompt},
            {'role': 'user', 'content': message},
        ],
        temperature=1,
        max_tokens=64,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    answer = response.choices[0].message.content
    return answer


class ActiveConversationView(generics.GenericAPIView):
    def post(self, request):
        prompt = request.data.get('prompt')
        topic = request.data.get('topic')
        
        # message = ask_davinci(topic)
        message = ask_chatgpt(topic, prompt)
        return Response(
            {
                'message': message
            },
            status=status.HTTP_200_OK)


class LoginView(generics.GenericAPIView):
    def post(self, request):

        def user_login(user):
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response(
                {
                    'accessToken': access_token,
                    'refreshToken': refresh_token,
                    'userId': user.id,
                    'username': user.username
                },
                status=status.HTTP_200_OK)

        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is None and username:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                user = User.objects.create_user(
                    username=username,
                    password=password,
                )
                user.save()

        return user_login(user)


class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects
    serializer_class = PersonaSerializer

    def get_queryset(self):
        queryset = self.queryset
        params = self.request.query_params

        username = params.get('username')
        if username:
            queryset = queryset.filter(creator__username__contains=username)

        return queryset


class PatternViewSet(viewsets.ModelViewSet):
    queryset = Pattern.objects
    serializer_class = PatternSerializer

    def get_queryset(self):
        queryset = self.queryset
        params = self.request.query_params

        name = params.get('name')
        num = params.get('num_participants')
        if name:
            queryset = queryset.filter(name__contains=name)
        elif num:
            queryset = queryset.filter(num_participants__lte=num)

        return queryset


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects
    serializer_class = ConversationSerializer

    def get_queryset(self):
        queryset = self.queryset
        params = self.request.query_params

        name = params.get('name')
        if name:
            queryset = queryset.filter(name__contains=name)

        return queryset


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects
    serializer_class = MessageSerializer

    def get_queryset(self):
        queryset = self.queryset
        params = self.request.query_params

        sender = params.get('sender')
        recipient = params.get('recipient')
        name = params.get('name')

        if sender:
            queryset = queryset.filter(sender__username=sender)
        elif recipient:
            queryset = queryset.filter(recipient__username=recipient)

        if name:
            queryset = queryset.filter(conversation__name__contains=name)

        return queryset

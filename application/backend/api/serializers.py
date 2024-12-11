from rest_framework import serializers
from .models import *


class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'


class PatternSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pattern
        fields = '__all__'


class ConversationSerializer(serializers.ModelSerializer):
    contributors = serializers.PrimaryKeyRelatedField(many=True, queryset=Persona.objects.all())

    class Meta:
        model = Conversation
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

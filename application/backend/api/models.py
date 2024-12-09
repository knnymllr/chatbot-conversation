from django.db import models
from django.contrib.auth.models import User
    
class Persona(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=10)
    prompt = models.TextField()
    public = models.BooleanField(default=True)

class Pattern(models.Model):
    name = models.CharField(max_length=255)
    num_participants = models.IntegerField()
    pattern = models.CharField(max_length=255)
    
class Conversation(models.Model):
    name = models.CharField(max_length=20, default="")
    initiator = models.IntegerField()
    contributors = models.ManyToManyField(Persona, related_name='contributors')
    pattern = models.ForeignKey(Pattern, on_delete=models.DO_NOTHING)
    notes = models.TextField()

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    message_id = models.IntegerField()
    message = models.TextField()
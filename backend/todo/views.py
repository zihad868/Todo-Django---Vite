from django.shortcuts import render
from rest_framework import viewsets
from . models import Todo
from . serializers import TodoSerializer
from rest_framework.response import Response

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
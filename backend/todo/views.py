from .models import Todo
from .serializers import TodoSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_done']


def health(request):
    return JsonResponse({"status":"ok"})
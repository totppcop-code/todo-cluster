from .models import Todo
from rest_framework import serializers

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

    def validate_title(self, value):
        if len(value) < 2:
            raise serializers.ValidationError('標題至少2字')
        return value
    def validate_content(self, value):
        if len(value) < 3:
            raise serializers.ValidationError('內容至少3字')
        return value
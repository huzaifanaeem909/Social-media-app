from rest_framework import serializers
from authentication.serializers import UserSerializer
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 

    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'content', 'created_at', 'updated_at']

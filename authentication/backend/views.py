from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import User

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create(username=username, email=email, password=password)
        user.save()
        return Response({'message': f'User created successfully: {user.username}', 'email': user.email, 'user': user.username}, status=status.HTTP_201_CREATED);

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email, password=password)
            return Response({'success': True, 'email': user.email, 'user': user.username})
        except User.DoesNotExist:
            return Response({'success': False}, status=status.HTTP_401_UNAUTHORIZED)

class GetUserData(APIView):
    def get(self, request):
        email = request.GET.get('email')
        if not email:
            return Response({'success': False, 'error': 'No email provided'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.filter(email=email).first()
        if user:
            return Response({'message': 'User has found', 'email': user.email, 'user': user.username})
        return Response({'success': False}, status=status.HTTP_401_UNAUTHORIZED)

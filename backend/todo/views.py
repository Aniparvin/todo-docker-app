from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Todo
# from .serializers import TodoSerializer

# @api_view(['PUT'])
# def update_todo(request, pk):
#     todo = Todo.objects.get(id=pk)
#     serializer = TodoSerializer(todo, data=request.data)

#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)

#     return Response(serializer.errors)
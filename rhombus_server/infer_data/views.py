from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from . import tern

# Create your views here.

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})

@api_view(['POST'])
def infer_data(request):
    if request.method == 'POST':
        # data = request.data
        file_obj = request.FILES['file']
        file_type = request.POST.get('file_type', '').lower()
        if file_type not in ['csv', 'excel']:
                return Response({'error': 'Invalid file type'}, status=400)
             
        df, type_map = tern.process(file_obj, file_type)
        if type(df) is str:
             return Response(df)
        
        # Convert DataFrame to JSON
        df_json = df.to_json(orient='records')

        
        # Prepare response data
        result = {
            'data': json.loads(df_json),
            'data_types': type_map
        }
        
        return Response(result)
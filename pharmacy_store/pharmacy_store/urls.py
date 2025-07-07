from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def root_view(request):
    return JsonResponse({'message': 'Pharmacy API is running'})

urlpatterns = [
    path('', root_view),  # ✅ Root path for Render
    path('admin/', admin.site.urls),
    path('api/', include('products.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

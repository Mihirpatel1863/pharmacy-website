from django.http import HttpResponse  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('products.urls')),
    
    path('healthz', lambda request: HttpResponse("OK")), 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

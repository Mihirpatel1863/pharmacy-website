from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


# ✅ Proper healthz view (returns 200 OK for GET and HEAD)
def health_check(request):
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('products.urls')),

    # ✅ Add healthz endpoint here
    path('healthz', health_check),
]

# ✅ Serve media files during development (optional in production)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# clubinhonerd URL Configuration

from django.contrib import admin
from django.urls import include, path
from django.conf  import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/',  admin.site.urls),
    path('',        include('clubinhonerd.core.urls')), 
    path('forum/',  include('clubinhonerd.forum.urls')),
    path('cursos/', include('clubinhonerd.courses.urls')),
    path('conta/',  include('clubinhonerd.accounts.urls')),
    # path('core/',  include('core.urls')), se estiver fora do clubinhonerd
]

# prefixo da aplição --> 'core/' ou 'clubinho/' --> são aplicações

# Quando estiver no ambiente DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
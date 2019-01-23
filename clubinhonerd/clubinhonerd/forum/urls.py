from django.urls import path, re_path

from . import views


app_name = 'forum'
urlpatterns = [ 
	path('', views.index, name='index'),
]

# re_path(r'^(?P<slug>[\w_-]+)/$', views.details, name='details'),





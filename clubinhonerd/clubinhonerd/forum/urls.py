from django.urls import path, re_path

from . import views


app_name = 'forum'
urlpatterns = [ 
	path('', views.index, name='index'),
	re_path(r'^tag/(?P<tag>[\w_-]+)/$', views.index, name='index_tagged'),
	re_path(r'^topico/(?P<slug>[\w_-]+)/$', views.thread, name='thread'),
	re_path(r'^respostas/(?P<pk>\d+)/correta/$', views.reply_correct, name='reply_correct'),
	re_path(r'^respostas/(?P<pk>\d+)/incorreta/$', views.reply_incorrect, name='reply_incorrect'),
]

# re_path(r'^(?P<slug>[\w_-]+)/$', views.details, name='details'),
# [\w_-] --> qualquer caracter alfanumérico '_' e '-'




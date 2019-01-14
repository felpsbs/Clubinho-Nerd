from django.urls import path, re_path

from . import views

urlpatterns = [ 
	path('', views.index, name='index'),
	re_path(r'^(?P<slug>[\w_-]+)/$', views.details, name='details'),
	re_path(r'^(?P<slug>[\w_-]+)/inscricao/$', views.enrollment, name='enrollment'),
	re_path(r'^(?P<slug>[\w_-]+)/cancelar-inscricao/$', views.undo_enrollment, name='undo_enrollment'),
	re_path(r'^(?P<slug>[\w_-]+)/anuncios/$', views.announcements, name='announcements'),
	re_path(r'^(?P<slug>[\w_-]+)/anuncios/(?P<pk>\d+)/$', views.show_announcement, name='show_announcement'),

]

# "re" = para expressão regular
# grupo nomeado = nome vai ser pk e no "d+" vai ser um numero (\d+)
# re_path(r'^(?P<pk>\d+)/$', views.details, name='details'),
# path('<int:pk>/', views.details, name='details'),
# caracter alfanumerico - e _
from django.urls import path, re_path

from . import views

urlpatterns = [ 
	path('', views.index, name='index'),
	# "re" = para expressão regular
	# grupo nomeado = nome vai ser pk e no "d+" vai ser um numero (\d+)
	# re_path(r'^(?P<pk>\d+)/$', views.details, name='details'),
	# path('<int:pk>/', views.details, name='details'),

	# caracter alfanumerico - e _
	re_path(r'^(?P<slug>[\w_-]+)/$', views.details, name='details'),
]
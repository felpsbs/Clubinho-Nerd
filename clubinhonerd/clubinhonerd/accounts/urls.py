from django.urls import path
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [ 
	path('entrar/', auth_views.LoginView.as_view(template_name='accounts/login.html'),name='login'),
	path('sair/', auth_views.LoginView.as_view(template_name='accounts/index.html'),name='logout'),
	path('cadastre-se/', views.register, name='register'),

]



from django.urls import path
from django.contrib.auth import views as auth_views
from django.conf import settings

from . import views

urlpatterns = [ 
	path('', views.dashboard, name='dashboard'),
	path('entrar/', auth_views.LoginView.as_view(template_name='accounts/login.html'),name='login'),
	path('sair/', auth_views.LogoutView.as_view(next_page='home'),name='logout'),
	path('cadastre-se/', views.register, name='register'),
	path('editar/', views.edit, name='edit'),
]



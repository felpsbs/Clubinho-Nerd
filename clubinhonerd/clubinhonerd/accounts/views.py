from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm, SetPasswordForm
from django.contrib.auth import authenticate, login, get_user_model
from django.contrib.auth.decorators import login_required 
from django.contrib import messages
# from django.conf import settings

from clubinhonerd.courses.models import Enrollment
from .forms import RegisterForm, EditAccountForm, PasswordResetForm
from .models import PasswordReset


User = get_user_model()


@login_required # para que apenas usuários logados tenham acesso
def dashboard(request):
	template_name = 'accounts/dashboard.html'
	context = {}
	# context['enrollments'] = Enrollment.objects.filter(user=request.user)
	return render(request, template_name, context)


def register(request):
	template_name = 'accounts/register.html'

	form = RegisterForm(request.POST or None)
	if form.is_valid():
		# todo modelform tem essa função
		user = form.save()
		user = authenticate(username=user.username, password=form.cleaned_data['password1'])
		login(request, user)
		form = RegisterForm()
		messages.success(request, 'Cadastro feito com sucesso.')
		return redirect('core:home')

	context = {
		'form' : form
	}

	return render(request, template_name, context)


@login_required
def edit(request):
	template_name = 'accounts/edit.html'
	context = {}
	# instance = popula o formulário com os dados do usuário
	form = EditAccountForm(request.POST or None, instance=request.user)
	if form.is_valid():
		form.save()
		form = EditAccountForm(instance = request.user)
		messages.success(request, 'Dados alterados com sucesso!')
		return redirect('accounts:dashboard')

	
	context['form'] = form
	return render(request, template_name, context)


def password_reset(request):
	template_name = 'accounts/password_reset.html'
	context = {}
	form = PasswordResetForm(request.POST or None)
	if form.is_valid():
		form.save()
		messages.info(request, 'Um e-mail foi enviado para você com mais detalhes de como criar uma nova senha!')

	context['form'] = form
	return render(request, template_name, context)


def password_reset_confirm(request, key):
	template_name = 'accounts/password_reset_confirm.html'
	context = {

	}
	reset = get_object_or_404(PasswordReset, key=key)
	form = SetPasswordForm(user=reset.user, data=request.POST or None)
	if form.is_valid():
		form.save()
		messages.success(request, 'Senha alterada com sucesso!')
		return redirect('accounts:login')
		
	context['form'] = form	
	return render(request, template_name, context)


@login_required
def edit_password(request):
	template_name = 'accounts/edit_password.html'
	context = {}
	
	if request.method == 'POST':
		form = PasswordChangeForm(data=request.POST, user=request.user)
		if form.is_valid():
			form.save()
			messages.success(request, 'Senha alterada com sucesso!')
	else:
		form = PasswordChangeForm(user=request.user)
		
	context['form'] = form
	return render(request, template_name, context)
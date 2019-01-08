from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class RegisterForm(UserCreationForm):

	email = forms.EmailField(label='E-mail')

	# Para validar/modificar campos especificos(como email) cria-se essa função "clean_nomedocampo"
	def clean_email(self):
		email = self.cleaned_data['email']

		if User.objects.filter(email=email).exists():
			raise forms.ValidationError('E-mail já em uso.')

		return email

	# isso tudo para salvar essa campo email no model
	def save(self, commit=True):
		user = super(RegisterForm, self).save(commit=False) # False aqui para nao salvar o user
		user.email = self.cleaned_data['email'] # valores ja validados e transformados em objeto python
		if commit:
			user.save()
		return user


class EditAccountForm(forms.ModelForm):

	# também especifica que esse campo será único
	def clean_email(self):
		email = self.cleaned_data['email']
		# busca para ver se o email existe, sem contar o do user atual
		queryset = User.objects.filter(email=email).exclude(pk=self.instance.pk)
		if queryset.exists():
			raise forms.ValidationError('E-mail já em uso.')

		return email

	class Meta:
		# modelo a ser usado
		model = User
		# campos que o user vai poder alterar
		fields = ['username', 'email', 'first_name', 'last_name']
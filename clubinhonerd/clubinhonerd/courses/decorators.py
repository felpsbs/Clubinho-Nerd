from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages

from .models import Course, Enrollment

# recebe como parametro um função(da view)
def enrollment_required(view_func):
	# função aauxiliar que será executada antes
	def _wrapper(request, *args, **kwargs):
		# para usar esse decorator, teŕa que ter o slug do curso na url
		slug = kwargs['slug']
		# buscando o curso
		course = get_object_or_404(Course, slug=slug)
		# verificando se o user tem permissão(admin)
		has_permission = request.user.is_staff
		if not has_permission:
			try:
				# buscando a matricula do user no curso
				enrollment = Enrollment.objects.get(
					user=request.user, course=course
				)
			except Enrollment.DoesNotExist:
				message = 'Desculpe, mas você não tem permissão para acessar está página.'
			else:
				if enrollment.is_approved():
					has_permission = True
				else:
					message = "A sua inscrição no curso ainda está pendente"
		if not has_permission:
			messages.error(request, message)
			return redirect('dashboard')	
		# para evitar outras consultas nesse curso, o mesmo é colocado na request 
		request.course = course
		# executo a view
		return view_func(request, *args, **kwargs)
	return _wrapper
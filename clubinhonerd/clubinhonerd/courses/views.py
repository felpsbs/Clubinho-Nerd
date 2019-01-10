from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required

from .models import Course, Enrollment
from .forms import ContactCourse

# A VIEW é utilizada para o que vai ou não ser mostrado na tela

def index(request):
	courses = Course.objects.all()
	template_name = 'courses/index.html'
	context = {
		'courses' : courses
	}
	return render(request, template_name, context)


def details(request, slug):
	course = get_object_or_404(Course, slug=slug)
	context = {}
	if request.method == 'POST':
		form = ContactCourse(request.POST)
		if form.is_valid():	
			context['is_valid'] = True
			form.send_mail(course)
			form = ContactCourse()
	else:
		form = ContactCourse()

	context['course'] = course
	context['form'] = form	
	template_name = 'courses/details.html'
	return render(request, template_name, context)

# O user é obrigado a estar logado para ver essa página
@login_required
def enrollment(request, slug): # fazer inscrição do user no curso
	course = get_object_or_404(Course, slug=slug)
	enrollment, created =  Enrollment.objects.get_or_create(user=request.user,course=course)
	if created:
		enrollment.active()

	return redirect('dashboard')









# para ir pelo id do curso

# def details(request, pk):
# 	course = get_object_or_404(Course, pk = pk)
# 	context = {
# 		'course': course
# 	}
# 	template_name = 'courses/details.html'
# 	return render(request, template_name, context)
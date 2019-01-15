from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .models import Course, Enrollment, Announcement, Lesson
from .forms import ContactCourse, CommentForm
from .decorators import enrollment_required
# A VIEW é utilizada para o que vai ou não ser mostrado na tela

def index(request):
	courses = Course.objects.all()
	template_name = 'courses/index.html'
	context = {
		'courses' : courses,
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
		messages.success(request, 'Você foi inscrito no curso com sucesso.')
	else:
		# messages também possui para errors
		messages.info(request, 'Você já está inscrito no curso.')

	return redirect('dashboard')


# Se desinscrever de um curso
@login_required
def undo_enrollment(request, slug):
	# Pegando o curso
	course = get_object_or_404(Course, slug=slug)
	# Verificando se o user está inscrito no curso
	enrollment = get_object_or_404(Enrollment, user=request.user, course=course)
	
	if request.method == 'POST':
		enrollment.delete()
		messages.success(request, 'Sua inscrição foi cancelada com sucesso')
		return redirect('dashboard')

	template_name = 'courses/undo_enrollment.html'
	context = {
		'enrollment': enrollment,
		'course': course,
	}
	return render(request, template_name, context)


@login_required
@enrollment_required
def announcements(request, slug):
	# Pegando o curso direto da request, que foi colocado pelo decorator
	course = request.course

	template_name = 'courses/announcements.html'
	context = {
		'course': course,
		'announcements': course.announcements.all()
	}
	return render(request, template_name, context)

@login_required
@enrollment_required
def show_announcement(request, slug, pk):
	# pk = chave primária do anúncio
	# Pegando o curso direto da request, que foi colocado pelo decorator
	course = request.course

	announcement = get_object_or_404(course.announcements.all(), pk=pk)
	form = CommentForm(request.POST or None)
	if form.is_valid():
		comment = form.save(commit=False)
		comment.user = request.user
		comment.announcement = announcement
		comment.save()
		form = CommentForm()
		messages.success(request, 'Seu comentário foi enviado com sucesso.')
	
	template_name = 'courses/show_announcement.html'
	context = {
		'course': course,
		'announcement': announcement,
		'form': form,
	}
	return render(request, template_name, context)

@login_required
@enrollment_required
def lessons(request, slug):
	course = request.course
	template_name = 'courses/lessons.html'
	lessons = course.release_lessons()
	if request.user.is_staff:
		lessons = course.lessons.all()
	context = {
		'course': course,
		'lessons': lessons
	}

	return render(request, template_name, context)


@login_required
@enrollment_required
def lesson(request, slug, pk):
	course = request.course
	lesson = get_object_or_404(Lesson, pk=pk, course=course)
	if not request.user.is_staff and not lesson.is_available():
		messages.error(request, 'Está aula não está disponível')
		return redirect('lessons', slug=request.slug)

	template_name = 'courses/lesson.html'
	context = {
		'course': course,
		'lesson': lesson
	}

	return render(request, template_name, context)






# para ir pelo id do curso

# def details(request, pk):
# 	course = get_object_or_404(Course, pk = pk)
# 	context = {
# 		'course': course
# 	}
# 	template_name = 'courses/details.html'
# 	return render(request, template_name, context)

# lógica do decorator
	# # Pegando o curso
	# 	course = get_object_or_404(Course, slug=slug)
	# 	# Verificando se o user é parte do admin
	# 	if not request.user.is_staff: 
	# 		# Verificando se o user está inscrito no curso
	# 		enrollment = get_object_or_404(Enrollment, user=request.user, course=course)
	# 		if not enrollment.is_approved():
	# 			messages.error(request, 'Sua inscrição está pendente.')
	# 			return redirect('dashboard')
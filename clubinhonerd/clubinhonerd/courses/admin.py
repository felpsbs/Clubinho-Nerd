from django.contrib import admin
from .models import Course, Enrollment, Announcement, Comment, Lesson, Material


class CourseAdmin(admin.ModelAdmin):
	
	list_display = ['name', 'slug', 'start_date', 'created_at']
	search_fields = ['name', 'slug']
	# popula o campo 'slug'separado com '-' tendo como base o 'name'
	prepopulated_fields = {'slug': ('name',)}

"""
Cadastrar os materiais de uma só vez, um ou mais models, inline
admin.TabularInline = campos ficam um do lado do outro
"""
class MaterialInlineAdmin(admin.StackedInline):
		
		model = Material


class LessonAdmin(admin.ModelAdmin):
	
	list_display = ['name', 'number', 'course', 'release_date']
	search_fields = ['name', 'description']
	list_filter = ['created_at']
	inlines = [
		MaterialInlineAdmin
	]
	

admin.site.register(Course, CourseAdmin)
admin.site.register([Enrollment, Announcement, Comment])
admin.site.register(Lesson, LessonAdmin)


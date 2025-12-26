from .models import Todo
from django import forms

class TodoForm(forms.ModelForm):
    class Meta:
        model = Todo
        fields = '__all__'
    
    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) < 3 :
            raise forms.ValidationError('標題至少3字')
        return title
    def clean_content(self):
        content = self.cleaned_data['content']
        if len(content) < 4:
            raise forms.ValidationError('內容至少4字')
        return content
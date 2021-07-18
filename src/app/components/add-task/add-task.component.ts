import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';    //interface
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter(); 
  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTask!: boolean;
  subscription!: Subscription;


  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.onToggle().subscribe(
      (value) =>(this.showAddTask = value)); 
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert('please add text!');
      return;
    }
    if (!this.day) {
      alert('please add day!'); 
      return;
    }

    if (!this.reminder) {
      alert('please set reminder!!');
      return; 
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }


    this.onAddTask.emit(newTask);
    
    this.text = ''; 
    this.day = '';
    this.reminder = false; 
  }
}

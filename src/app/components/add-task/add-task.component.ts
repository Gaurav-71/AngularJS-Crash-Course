import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { UiService } from 'src/app/services/ui.service';

import { Task } from "../../Task"

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()

  text: string;
  day: string;
  reminder: boolean;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.text = "";
    this.day = "";
    this.reminder = false;
    this.showAddTask = false;
    this.subscription = this.uiService.onToggle().subscribe((value) => this.showAddTask = value)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert("Please add a task");
      return;
    }
    const newTask = { text: this.text, day: this.day, reminder: this.reminder }

    this.onAddTask.emit(newTask);

    this.text = ""
    this.day = ""
    this.reminder = false
  }

}

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  toggle(event) {
    const taskId = event.target.dataset.taskId;
    const checked = event.target.checked;

    fetch(`/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
      },
      body: JSON.stringify({ task: { check: checked } })
    });
  }

  delete(event) {
    const taskId = event.target.dataset.taskId;

    fetch(`/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
      }
    }).then(() => document.getElementById(`task_${taskId}`).remove());
  }
}

class TasksController < ApplicationController
  before_action :set_task, only: %i[show edit update destroy]

  def index
    @tasks = Task.all
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      respond_to do |format|
        format.html { redirect_to tasks_path, notice: "Task added!" }
        format.js   # Render create.js.erb (will be added below)
      end
    else
      render :new
    end
  end

  def update
    if @task.update(task_params)
      head :no_content  # No need to render anything for AJAX request
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy!
    head :no_content  # No need to render anything
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :check)
  end
end

package com.gitsoubi.taskviewer.serverconnection;

import java.util.List;

import com.gitsoubi.taskviewer.Task;

public interface TaskDatabase {
	List<Task> getAllTasks();
	// TODO: throw exception or flag if fail??
	void createNewTask();
	void removeTask();
	void editTask();
}

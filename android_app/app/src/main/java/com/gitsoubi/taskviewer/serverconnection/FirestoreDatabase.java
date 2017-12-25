package com.gitsoubi.taskviewer.serverconnection;


import com.gitsoubi.taskviewer.Task;

import java.util.ArrayList;
import java.util.List;

public class FirestoreDatabase implements TaskDatabase {
	@Override
	public List<Task> getAllTasks() {
		return new ArrayList<Task>();
	}

	@Override
	public void createNewTask() {

	}

	@Override
	public void removeTask() {

	}

	@Override
	public void editTask() {

	}
}

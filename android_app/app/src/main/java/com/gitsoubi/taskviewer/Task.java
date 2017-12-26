package com.gitsoubi.taskviewer;

import java.util.Date;

public class Task {
	// FIXME: types instead of ints
	public Task(String name, Date timestamp, String description, int priority, int color) {
		mName = name;
		mTimestamp = timestamp;
		mDescription = description;
		mPriority = priority;
		mColor = color;
	}

	public String getName() {
		return mName;
	}

	public Date getTimestamp() {
		return mTimestamp;
	}

	public String getDescription() {
		return mDescription;
	}

	public int getPriority() {
		return mPriority;
	}

	public int getColor() {
		return mColor;
	}
	
	private String mName;
	private Date mTimestamp;
	private String mDescription;
	private int mPriority;
	private int mColor; // FIXME: why not "category" or something?
}

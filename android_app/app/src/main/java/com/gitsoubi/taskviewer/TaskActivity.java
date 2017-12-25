package com.gitsoubi.taskviewer;

import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QuerySnapshot;

public class TaskActivity extends AppCompatActivity {
	private static final String TAG = "TaskActivity";

	private class TaskOnCompleteListener implements OnCompleteListener<QuerySnapshot> {
		@Override
		public void onComplete(@NonNull Task<QuerySnapshot> task) {
			if (task.isSuccessful()) {
				Log.d(TAG, "Successfully queried Firestore database.");
			}
			else {
				Log.e(TAG, "Error querying Firestore database.", task.getException());
			}
		}
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_task);

		FirebaseFirestore db = FirebaseFirestore.getInstance();
		db.collection("users").get().addOnCompleteListener(new TaskOnCompleteListener());
	}
}

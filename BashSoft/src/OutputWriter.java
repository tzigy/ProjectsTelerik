import java.io.File;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * Created by Tzigy on 21.05.2016.
 */
public class OutputWriter {

	public static void writeMessage(String message) {
		System.out.print(message);
	}

	public static void writeMessageOnNewLine(String message) {
		System.out.println(message);
	}

	public static void writeEmptyLine() {
		System.out.println();
	}

	public static void displayException(String message) {
		System.out.print(message);
	}

	public static void traverseFolders(String path) {

		Queue<File> subfolders = new LinkedList<File>();


		File root = new File(path);
		subfolders.add(root);

		while (!subfolders.isEmpty()) {

			File currentFolder = subfolders.remove();
			try {
				if (currentFolder.listFiles().length != 0) {
					for (File file : currentFolder.listFiles()) {
						if (file.isDirectory()) {
							subfolders.add(file);
						}
					}
				}
			} catch (Exception ex) {
				System.out.println("Access denied");
			}

			System.out.println(currentFolder.toString());
		}
	}

	public  static void displayStudent(String studentName, List<Integer> marks){

		String output = String.format("%s - %s", studentName, marks.toString());
		OutputWriter.writeMessageOnNewLine(output);
	}
}

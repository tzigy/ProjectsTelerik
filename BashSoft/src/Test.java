import java.io.File;
import java.io.IOException;
import java.util.LinkedList;
import java.util.Queue;

/**
 * Created by Tzigy on 21.05.2016.
 */
public class Test {

	public static void main(String[] args) throws IOException {

//		traverseFolders("c:/");
//IOManager.createDirectoryInCurrentFolder("tzigyyyyy");
//		String path = SessionData.currentPath;
//		System.out.println(path);
//
//		File file = new File(path);
//		File[] files = file.listFiles();
//
//		for (File file1 : files) {
//			System.out.println(file1.getTotalSpace());
//		}

		Tester.compareContent("D:\\TelerikAcademy\\Java\\SoftUni\\AdvancedJava2016\\Lab\\test5.txt", "D:\\TelerikAcademy\\Java\\SoftUni\\AdvancedJava2016\\Lab\\test2.txt");
	}



}

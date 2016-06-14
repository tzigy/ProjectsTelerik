import java.io.File;
import java.util.LinkedList;
import java.util.Queue;

/**
 * Created by Tzigy on 21.05.2016.
 */
public class IOManager {

    public static void createDirectoryInCurrentFolder(String name) {
        String path = getCurrentDirectoryPath() + "\\" + name;
        File file = new File(path);
        file.mkdir();
    }

    public static String getCurrentDirectoryPath() {
        String currentPath = SessionData.currentPath;

        return currentPath;
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

    public static void traverseDirectory(int depth){
        LinkedList<File> subFolders = new LinkedList<>();
        String path = getCurrentDirectoryPath();
        int initialIndentation = path.split("\\\\").length;
        File root = new File(path);
        subFolders.add(root);

        while (subFolders.size() > 0){
            File currentFolder = subFolders.removeFirst();
            int currentIndentation = currentFolder.toString().split("\\\\").length - initialIndentation;
            if (depth - currentIndentation < 0){
                break;
            }
            OutputWriter.writeMessageOnNewLine(currentFolder.toString());

            if (currentFolder.listFiles() != null){
                for (File file : currentFolder.listFiles()) {
                    if (file.isDirectory()){
                        subFolders.add(file);
                    } else {
                        int indexOfLastSlash = file.toString().lastIndexOf("\\");
                        for (int i = 0; i < indexOfLastSlash; i++) {
                            OutputWriter.writeMessage("-");
                        }
                        OutputWriter.writeMessageOnNewLine(file.getName());
                    }
                }
            }

        }
    }
    public static void changeCurrentDirRelativePath(String relativePath) {

        String currentPath = SessionData.currentPath;

        if (relativePath.equals("..")) {

            try {
                int indexOfLastSlash = currentPath.lastIndexOf("\\");
                String newPath = currentPath.substring(0, indexOfLastSlash);
                SessionData.currentPath = newPath;
            } catch (StringIndexOutOfBoundsException e) {
                OutputWriter.displayException(ExceptionMessages.INVALID_DESTINATION);
            }
        } else {
            currentPath += "\\" + relativePath;
            changeCurrentDirAbsolute(currentPath);
        }
    }

    public static void changeCurrentDirAbsolute(String absolutePath) {

        File file = new File(absolutePath);

        if (!file.exists()) {
            OutputWriter.displayException(ExceptionMessages.INVALID_PATH);
            return;
        }

        SessionData.currentPath = absolutePath;
    }
}


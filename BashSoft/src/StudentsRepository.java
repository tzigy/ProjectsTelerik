import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Tzigy on 21.05.2016.
 */
public class StudentsRepository {

    public static boolean isDataInitialized = false;
    public static Map<String, Map<String, List<Integer>>> studentsByCourse;

//	public StudentsRepository() {
//		this.studentsByCourse = new HashMap<String, Map<String, List<Integer>>>();
//	}


    public static void initializeData(String fileName) {

        if (isDataInitialized) {
            OutputWriter.displayException(ExceptionMessages.DATA_ALREADY_INITIALIZED);
            return;
        }

        studentsByCourse = new HashMap<String, Map<String, List<Integer>>>();
        try {
            readData(fileName);
            isDataInitialized = true;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void readData(String fileName) throws IOException {

        String regex = "([A-Z][a-zA-Z#+]*_[A-Z][a-z]{2}_\\d{4})\\s+([A-Z][a-z]{0,3}\\d{2}_\\d{2,4})\\s+([0-9]+)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher;

        String path = SessionData.currentPath + "\\" + fileName;
        List<String> lines = Files.readAllLines(Paths.get(path));

        for (String line : lines) {
            matcher = pattern.matcher(line);

            if ((!line.isEmpty()) && matcher.find()) {
                String course = matcher.group(1);
                String student = matcher.group(2);
                Integer mark = Integer.parseInt(matcher.group(3));

                if (0 <= mark && mark <= 100) {

                    if (!studentsByCourse.containsKey(course)) {
                        studentsByCourse.put(course, new HashMap<String, List<Integer>>());
                    }

                    if (!studentsByCourse.get(course).containsKey(student)) {
                        studentsByCourse.get(course).put(student, new ArrayList<Integer>());
                    }
                    studentsByCourse.get(course).get(student).add(mark);
                }
            }
        }

//		List<String> lines = Files.readAllLines(Paths.get(path));
//
//		for (String line : lines) {
//
//			String[] tokens = line.split("\\s+");
//			String course = tokens[0];
//			String student = tokens[1];
//			Integer mark = Integer.parseInt(tokens[2]);
//
//			if (!studentsByCourse.containsKey(course)) {
//				studentsByCourse.put(course, new HashMap<String, List<Integer>>());
//			}
//
//			if (!studentsByCourse.get(course).containsKey(student)) {
//				studentsByCourse.get(course).put(student, new ArrayList<Integer>());
//			}
//
//			studentsByCourse.get(course).get(student).add(mark);
//
//		}

        OutputWriter.writeMessageOnNewLine("Data read!");
    }

    private static boolean isQueryForCoursePossible(String courseName) {

        if (!isDataInitialized) {
            OutputWriter.displayException(ExceptionMessages.DATA_NOT_INITIALIZED);
            return false;
        }

        if (!studentsByCourse.containsKey(courseName)) {
            OutputWriter.displayException(ExceptionMessages.NOT_EXISTING_COURSE);
            return false;
        }

        return true;
    }

    private static boolean isQueryForStudentPossible(String courseName, String studentName) {

        if (!isQueryForCoursePossible(courseName)) {
            return false;
        }

        if (!studentsByCourse.get(courseName).containsKey(studentName)) {
            OutputWriter.displayException(ExceptionMessages.NOT_EXISTING_STUDENT);
            return false;
        }

        return true;
    }

    public static void getStudentsMarksInCourse(String courseName, String studentName) {

        if (!isQueryForStudentPossible(courseName, studentName)) {
            return;
        }

        List<Integer> marks = studentsByCourse.get(courseName).get(studentName);
        OutputWriter.displayStudent(studentName, marks);
    }

    public static void getStudentsByCourse(String courseName) {

        if (!isQueryForCoursePossible(courseName)) {
            return;
        }

        //Map<String, List<Integer>> students = studentsByCourse.get(courseName);
        OutputWriter.writeMessageOnNewLine(courseName + ":");

        for (Map.Entry<String, List<Integer>> student : studentsByCourse.get(courseName).entrySet()) {
            OutputWriter.displayStudent(student.getKey(), student.getValue());
        }
    }
}
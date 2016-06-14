import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Tzigy on 30.05.2016.
 */
public class Tester {

    public static void compareContent(String actualOutput, String expectedOutput) {
       try{
        OutputWriter.writeMessageOnNewLine("Reading files...");
        String mismatchPath = getMismatchPath(expectedOutput);

        List<String> actualOutputString = readTextFile(actualOutput);
        List<String> expectedOutputString = readTextFile(expectedOutput);

        boolean isMismatch = compareStrings(actualOutputString, expectedOutputString, mismatchPath);

        if (isMismatch) {
            List<String> mismatchString = readTextFile(mismatchPath);
            mismatchString.forEach(OutputWriter::writeMessageOnNewLine);
        } else {
            OutputWriter.writeMessageOnNewLine("Files are identical! There are no mismatches!");
        }
       }catch (IOException e){
           OutputWriter.displayException(ExceptionMessages.INVALID_PATH);
       }
    }

    public static String getMismatchPath(String expectedOutput) {
        int index = expectedOutput.lastIndexOf("\\");
        String directoryPath = expectedOutput.substring(0, index);

        return directoryPath + "\\mismatch.txt";
    }

    private static List<String> readTextFile(String filePath) throws IOException {
        List<String> output = new ArrayList<>();

        File file = new File(filePath);

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {

            String line;

            while ((line = br.readLine()) != null) {
                output.add(line);

            }
        }
//          catch (FileNotFoundException e) {
//            OutputWriter.writeMessageOnNewLine("File not found!");
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        return output;
    }

    private static boolean compareStrings(List<String> actualOutputString,
                                          List<String> expectedOutputString,
                                          String mismatchPath) {
        boolean isMismatch = false;
        OutputWriter.writeMessageOnNewLine("Comparing files...");
        File file = new File(mismatchPath);
        StringBuilder output = new StringBuilder();


        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {

            if (actualOutputString.size() != expectedOutputString.size()) {
                isMismatch = true;

                output.append("Actual and expected file are with different length");
            } else {

                for (int i = 0; i < expectedOutputString.size(); i++) {
                    String actualLine = actualOutputString.get(i);
                    String expectedLine = expectedOutputString.get(i);

                    if (!actualLine.equals(expectedLine)) {
                        isMismatch = true;
                        output.append(String.format("line mismatch: expectes{%s}, actual{%s}%n", expectedLine, actualLine));
                    } else {
                        output.append(String.format("line match: {%s}%n", actualLine));
                    }
                }
            }

            writer.write(output.toString());

        } catch (IOException e) {
            isMismatch = true;
            OutputWriter.displayException(ExceptionMessages.CANNOT_ACCESS_FILE);
        }

        return isMismatch;
    }
}

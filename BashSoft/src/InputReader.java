import java.util.Scanner;

/**
 * Created by Tzigy on 05.06.2016.
 */
public class InputReader {

    private static final String END_COMMAND = "quit";

    public static void readCommands(){
        Scanner scanner = new Scanner(System.in);

        while (true){
            OutputWriter.writeMessage(String.format("%s > ", SessionData.currentPath));
            String input = scanner.nextLine().trim();

            if (input.equals(END_COMMAND)){
                break;
            }

            CommandInterpreter.interpretCommand(input);
        }
    }
}

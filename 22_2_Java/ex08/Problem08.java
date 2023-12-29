
import java.util.Scanner;

public class Problem08
{
    public static void main(String[] args)
    {
        try
        {
            System.out.print("Enter time in 24-hour notation: ");
            Scanner keyboard = new Scanner(System.in);
            int hour = keyboard.nextInt( );

            if(hour < 1 || hour > 24) {
                throw new HourException(hour);
            } else if(hour > 0 && hour < 12) {
            	System.out.println("That is the same as "  + hour + "AM");
            } else {
            	hour = hour - 12;
            	System.out.println("That is the same as "  + hour + "PM");
            }
            
           
        }
        catch(HourException e)
        {
            System.out.println(e.getMessage());
        }

    }
}






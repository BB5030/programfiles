import java.util.Scanner;

public class Problem3 {
	public static void main (String [] args)
    {
        Scanner keyboard = new Scanner (System.in);
        
        int inputNum;
        System.out.print ("Enter a number: ");
        inputNum = keyboard.nextInt();
        
        int printedNum=1;
        
        if(inputNum > 0) {
        	for(int i=0; i < inputNum; i++) {
        		for(int j=0; j<=i; j++) {
        			System.out.print(printedNum+" ");
        			printedNum++;
        		}
        		System.out.print("\n");
        	}
        } else {
        	System.out.print ("Error!! You entered Wrong Number!!");
        	System.exit(0);
        }
    }
}

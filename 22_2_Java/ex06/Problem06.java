import java.util.Scanner;

public class Problem06 {
	public static void main (String [] args)
    {
		int numofInt;
		Scanner keyboard = new Scanner (System.in);
		
		System.out.print("Input the number of integers: ");
		numofInt = keyboard.nextInt();
		
        int [] array = new int [numofInt];
        System.out.print("Input integers: ");
        for(int i=0; i<numofInt; i++) {
        	array[i] = keyboard.nextInt();
        }
        
        System.out.print("Output: ");
        for(int i=0; i<numofInt; i++) {
        	if(array[i] != 0) {
        		System.out.print(array[i]+" ");
        	}
        }
    }
}

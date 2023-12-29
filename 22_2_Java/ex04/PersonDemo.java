import java.util.Scanner;
public class PersonDemo {
	public static void main (String [] args)
    {
		Scanner keyboard = new Scanner(System.in);
		
        System.out.print ("Enter the name of the person: ");
        String name = keyboard.nextLine ();
        System.out.print ("Enter the age of the person: ");
        int age = keyboard.nextInt ();
        
        Person newPerson = new Person(name, age);
        newPerson.isAdult();
        
    }
}

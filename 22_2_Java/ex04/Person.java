
public class Person {
	private String name;
    private int age; 
    
    public Person (String initialName, int initialAge)                  
    {
        name = initialName;
        age = initialAge;    
    }
    
    public void isAdult() {
    	if(age < 20) System.out.println("The person is not adult.");
    	else System.out.println("The person is adult.");
    }
}

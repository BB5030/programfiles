
public class Person {
	private static int numberOfPeople=0;
	private String name;
	private int age;
	
	
	public Person() {
	}
	
	public Person(String name, int age) {
		this.name = name;
		this.age = age;
		numberOfPeople++;
	}
	
	public String getName() {
		return name;
	}
	
	public int getAge() {
		return age;
	}
	
	public static int getNumberOfPeople() {
		return numberOfPeople;
	}
}

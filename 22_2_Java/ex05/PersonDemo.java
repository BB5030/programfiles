
public class PersonDemo {
	public static void main(String [] args) {
		Person p1 = new Person("Ann", 20);
		System.out.println("Name: " + p1.getName());
		System.out.println("Age: " + p1.getAge());
		System.out.println("# of people: " + Person.getNumberOfPeople());
		Person p2 = new Person("Bob", 37);
		System.out.println("Name: " + p2.getName());
		System.out.println("Age: " + p2.getAge());
		System.out.println("# of people: " + Person.getNumberOfPeople());
	}
}

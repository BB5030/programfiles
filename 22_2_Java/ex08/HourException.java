
public class HourException extends Exception
{
    public HourException(int hour)
    {
    	super("There is no such time as " + hour + ".");
    }
}
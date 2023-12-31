public class Triangle extends ShapeBasics 
	implements TriangleInterface
{
    private int base;

    public Triangle( )
    {
        super( );
        base = 0;
    }

    public Triangle(int theOffset, int theBase)
    {
        super(theOffset);
        base = theBase;
    }

	public void set(int newBase)
    {
        base = newBase;
    }

    public void drawHere( )
    {
        drawTop( );
        drawBase( );
    }

    private void drawBase( )
    {
        skipSpaces(getOffset( ));
        for (int count = 0; count < base; count++)
            System.out.print('*');
         System.out.println( );
    }

    private void drawTop( )
    {
		int top = getOffset( ) + base / 2;
        skipSpaces(top);
        System.out.println('*');
        int lineCount = base / 2 - 1; 

        int insideWidth = 1;
        for (int count = 0; count < lineCount; count++)
        {

            top = top - 1;
            skipSpaces(top);
            System.out.print('*');
            skipSpaces(insideWidth);
            System.out.println('*');

            insideWidth = insideWidth + 2;
        }
    }

    private static void skipSpaces(int number)
    {
        for (int count = 0; count < number; count++)
            System.out.print(' ');
    }
}

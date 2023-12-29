public class TreeDemo
{
    public static void main (String [] args)
    {
        drawTree ();
    }


    public static void drawTree ()
    {
        System.out.println ("Quiz");
        TriangleInterface treeTop1 = new Triangle (2, 5);
        drawTop (treeTop1);
        TriangleInterface treeTop2 = new Triangle (1, 7);
        drawTop (treeTop2);
        TriangleInterface treeTop3 = new Triangle (0, 9);
        drawTop (treeTop3);
        RectangleInterface treeTrunk1 = new Rectangle (2, 3, 5);
        drawTrunk (treeTrunk1);
        RectangleInterface treeTrunk2 = new Rectangle (2, 5, 5);
        drawTrunk (treeTrunk2);
    }


    private static void drawTop (TriangleInterface treeTop)
    {
        treeTop.drawAt (1);
    }


    private static void drawTrunk (RectangleInterface treeTrunk)
    {
        treeTrunk.drawHere (); 
    }
}
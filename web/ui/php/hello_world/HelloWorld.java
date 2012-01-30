import javax.swing.JOptionPane;


public class HelloWorld {
  public static final String JAVABRIDGE_PORT="8087";
  static final php.java.bridge.JavaBridgeRunner runner = 
    php.java.bridge.JavaBridgeRunner.getInstance(JAVABRIDGE_PORT);

  public static void main(String args[]) throws Exception {
    runner.waitFor();
    System.exit(0);
  }
  public void hello(String args[]) throws Exception {
    JOptionPane.showMessageDialog(null, "hello " + args[0]);
  }
}

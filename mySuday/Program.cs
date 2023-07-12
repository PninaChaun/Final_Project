using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace ConsoleApp1
{
    class Program
    {
        public static int number_for_barcket(int a, int b)//מספר האפשרויות לסוגריים לדוגמא : ()()
        {
            if (a == 0)
                return 1;
            if (a == b)
                return number_for_barcket(a - 1, b);
            if (a < b)
                return number_for_barcket(a, b - 1) + number_for_barcket(a - 1, b);
            return 0;
        }
        public static bool bracket(string str)//<div><p>hello</p><em>jh</div>
        {
            Stack<string> stack = new Stack<string>();
            int i1 = 0, i2 = 0;
            while (i1 != -1 && i2 != -1)
            {
                i1 = str.IndexOf("<", i2);
                i2 = str.IndexOf(">", i2 + 1);
                if (i1 != -1 && i2 != -1)
                {
                    if (str.Substring(i1 + 1, 1) == "/")//close
                    {
                        if (stack.Peek() != str.Substring(i1 + 2, (i2) - (i1 + 2)))
                        {
                            Console.WriteLine("current   " + str.Substring(i1 + 2, (i2) - (i1 + 2)));
                            Console.WriteLine("error    " + stack.Peek());
                            return false;
                        }
                        else
                        {
                            stack.Pop();
                        }
                        Console.WriteLine("close  " + str.Substring(i1 + 2, (i2) - (i1 + 2)));
                    }
                    else//open
                    {
                        stack.Push(str.Substring(i1 + 1, (i2) - (i1 + 1)));
                        Console.WriteLine("open  " + str.Substring(i1 + 1, (i2) - (i1 + 1)));
                    }
                }

            }
            return true;
        }
        public static void get_string_return_string_of_tav_number()//מקבל מחרוזת ומחזיר מחרוזת מצוצצמת :  תו + מספר מופעים
        {
            
            string str = "aaadfrr", newstr="";
            char prev = str[0],curr=str[1];
            int cnt = 1;
            for (int i = 1; i < str.Length; i++)
            {
                curr = str[i];
                if (curr == prev)
                {
                    cnt++;
                }
                else
                {
                    newstr += prev+cnt.ToString();
                    cnt = 1;
                    prev = curr;
                }
            }
            newstr += prev + cnt.ToString();
            Console.WriteLine(newstr);
           
        }
        public static void challenge_token()//
        {
            string str = "Hello, World!";
            char[] chars = str.ToCharArray();

            for (int i = 2; i < chars.Length; i += 3)
            {
                chars[i] = 'x';
            }

            string result = new string(chars);
            Console.WriteLine(result);
        }
        public static void reverse_string()
        {
            string s = "abcdefghijklmnopqrstuvwxyz";
            char[] chararray = s.ToCharArray();
            Array.Reverse(chararray);
            s = new string(chararray);
            Console.WriteLine(s);
        }
        public static void min_string_that_countain_all_chars()//  המחרוזת הקטנה שבה כל התווים של המחרוזת השניה מוכלים 
        {
            string[] arrstring = { "aaffhkksemckelloe", "fhea" };
            int min = arrstring[0].Length, start = 0, end = 0;
            int[] temparr = new int[arrstring[1].Length];
            Dictionary<char, int> charMap = arrstring[1].Distinct().ToDictionary(c => c, _ => -1);
            for (int i = 0; i < temparr.Length; i++)//initialize temparr to -1
            {
                temparr[i] = -1;
            }
            string tempstr1 = arrstring[0];// ahffaksfajeeubsne
            string tempstr2 = arrstring[1];// jefaa

            int index = 0;//cur
            for (int i = 0; i < tempstr1.Length; i++)
            {
                char tav = tempstr1[i];
                if (tempstr2.Contains(tav))
                {
                    if (i == 4)
                    {
                        Console.WriteLine("mm");
                    }
                    if (tempstr2.Count(c => c == tav) > 1)
                    {
                        if (charMap[tav] == tempstr2.Length || tempstr2.IndexOf(tav, charMap[tav] + 1) == -1 || charMap[tav] == -1)
                            charMap[tav] = -1;
                        index = tempstr2.IndexOf(tav, charMap[tav] + 1);
                        temparr[index] = i;
                        charMap[tav] = index;
                    }
                    else
                    {
                        index = tempstr2.IndexOf(tav);
                        temparr[index] = i;
                    }
                    if (temparr.ToList().Where(x => x != -1).Count() == temparr.Length && min > temparr.ToList().Max() - temparr.ToList().Min())
                    {
                        min = temparr.ToList().Max() - temparr.ToList().Min();
                        start = temparr.ToList().Min();
                        end = temparr.ToList().Max();
                    }

                }
            }
            Console.WriteLine(tempstr1.Substring(start, min + 1));
        }
        public static void valid_barcket()
        {
            string s2 = "(c(oder)) b(yte)";
            int start = 0, end = 0;
            foreach (char item in s2)
            {
                if (item.Equals('('))
                    start++;
                if (item.Equals(')') && start > 1)
                    start--;
            }
            Console.WriteLine(start == 0);
        }
        public static void sum_element_together()
        {
            int[][] array = { new int[] { 1, 2, 3, 4 }, new int[] { 8, 9 } };

            int size1 = array[0].Length;
            int size2 = array[1].Length;
            int maxsize = Math.Max(size1, size2);
            int[] arrRes = new int[maxsize];
            for (int i = 0; i < maxsize; i++)
            {
                int cur = 0;
                if (i < size1) cur += array[0][i];
                if (i < size2) cur += array[1][i];
                arrRes[i] = cur;
            }
            for (int i = 0; i < maxsize; i++)
            {
                Console.WriteLine(arrRes[i]);
            }
        }
        public static void print_longest_word()
        {
            string str = "fun&!! time", newstr = "";
            foreach (char item in str)
            {
                if (char.IsDigit(item) || char.IsNumber(item) || char.IsWhiteSpace(item))
                {
                    newstr += item;
                }
            }
            string[] a7 = newstr.Split();
            int mm = 0;
            foreach (string item in a7)
            {
                if (item.Length > mm)
                {
                    mm = item.Length;

                }

            }
        }
        public static void print_common_number()
        {
            string[] arr = new string[] { "1, 3, 4, 7, 13", "1, 2, 4, 13, 15" };
            string[] a = arr[0].Split(", ");//{"1","2","4",  ...
            string[] b = arr[1].Split(", ");
            int x = 0, y = 0, z = 0;
            int max5 = 0, j = 0,i=0;
            if (a.Length > b.Length)
                max5 = a.Length;
            else
                max5 = b.Length;
            int[] arrResult = new int[max5];
            for (i = 0, j = 0; i < a.Length && j < b.Length;)
            {
                Int32.TryParse(a[i], out x);
                Int32.TryParse(b[j], out y);
                if (x == y)
                {
                    arrResult[z++] = x;
                    i++;
                    j++;
                }
                else
                {
                    if (x > y)
                        j++;
                    else
                        i++;
                }
            }
            string r = "";
            for (i = 0; i < z; i++)
            {
                r += arrResult[i] + ",";
            }
            Console.WriteLine("item" + r.Substring(0, r.Length - 1));

        }
        public static void sort_string()
        {
            string input = "dcba";
            // Convert the string to a character array
            char[] charArray = input.ToCharArray();

            // Sort the character array
            Array.Sort(charArray);

            // Convert the sorted character array back to a string
            string sortedString = new string(charArray);
            //
            Console.WriteLine("Sorted string: " + sortedString);
        }
        public static void print_longest_word_in_string()
        {
            // String of authors
            string authors = "Mahesh Chand Henry He, Chris Love Raj Beniwal Praveen Kumar";
            // Split authors separated by a comma followed by space
            string[] authorsList = authors.Split(" ");
            int max = 0;
            string wordmax = "";
            foreach (string author in authorsList)
            {
                Console.WriteLine(author);
                if (author.Length > max)
                {
                    max = author.Length;
                    wordmax = author;
                }
            }
            Console.WriteLine(wordmax);
        }
        public static void strip_string()//A2B2C1D  =>  AABBCD
        {
            string s = "A2B2C1D";
            string res2 = "";
            string prev = "";
            int num1 = 0;
            foreach (char c in s)
            {

                if (char.IsDigit(c))
                {
                    int.TryParse(c.ToString(), out num1);
                    for (int i = 1; i < num1; i++)
                    {
                        res2 += prev;
                    }
                }
                else
                {
                    res2 += c;
                    prev = c.ToString();
                }
            }
            Console.WriteLine(res2);
        }
        public static void f()
        {
            string s = "A2B2C1D";
            Regex rgx = new Regex(@"[^\w\s]");
            string sen = rgx.Replace(s, "");
            Console.WriteLine("sen   :" + sen);
            string [] words = sen.Split(' ');

            words.OrderByDescending(x => x.Length).First();
        }
        static void Main(string[] args)
        {
            Console.WriteLine(bracket("<div><p>hello</p><em>jh</div>"));//<div><p>hello</p></em>jh</div>

            f();
            /*
            string result = "false";
            int qcounter = 0;
            char prevdigit = 'a';
            char curdigit = 'a';
            int i = 0;
            for (i = 0; i < str.Length; i++)
            {
                char digit = str[i];
                if (digit == '?')
                {
                    qcounter++;
                }
                if (Char.IsDigit(digit))
                {

                    if (prevdigit == 'a')
                    {
                        prevdigit = digit;
                    }
                    else if (curdigit == 'a')
                    {
                        curdigit = digit;
                        ///Console.Write((int)char.GetNumericValue(prevdigit) + (int)char.GetNumericValue(curdigit) + ":"+qcounter);
                        if ((int)char.GetNumericValue(prevdigit) + (int)char.GetNumericValue(curdigit) == 10 && qcounter == 3)
                        {
                            result = "true";
                            prevdigit = curdigit;
                            curdigit = 'a';
                        }
                        else if ((int)char.GetNumericValue(prevdigit) + (int)char.GetNumericValue(curdigit) == 10 && qcounter != 3)
                        {
                            // return "false";
                        }

                    }
                    qcounter = 0;
                }
            }
            //
            Console.WriteLine("Hello World!");
          
            //
       
            ///
            
            string input1 = "4555188835789";//1435789
            int num1 = 4, num2 = 0;
            int res = ((1 + num1) * num1) / 2;
            for (i = 1; i < input1.Length; i++)
            {
                if (char.IsDigit(input1[i - 1]) && char.IsDigit(input1[i]))
                {
                    int.TryParse(input1[i - 1].ToString(), out num1);
                    int.TryParse(input1[i].ToString(), out num2);
                    if (num1 % 2 == 1 && num2 % 2 == 1)
                    {
                        input1 = input1.Substring(0, i) + "4" + input1.Substring(i, input1.Length - i);
                        i += 1;
                    }
                }
            }
            Console.WriteLine("Sorted string: " + res);
            Console.WriteLine("Comma separated strings");
           

            
            

            int x1 = 124;
            int x2 = x1 / 60;
            int x3 = x1 % 60;
            Console.WriteLine(x2 + ":  " + x3);
            */
        }
    }
}



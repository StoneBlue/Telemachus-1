﻿//Author: Richard Bunt
using System;
using System.Collections.Generic;
using System.Text;
using UnityEngine;

namespace Telemachus
{
    class PluginLogger
    {
        public static void debug(String s)
        {
#if (DEBUG)
            UnityEngine.Debug.Log("[Telemachus]" +  s);
#endif
        }

        public static void print(String s)
        {
            UnityEngine.Debug.Log("[Telemachus]" + s);
        }

        public static string listToString(List<int> l)
        {
            string ret = "[";
            foreach (int i in l)
            {
                ret += i + ",";
            }

            ret = ret.Remove(ret.LastIndexOf(","));
            ret += "]";

            return ret;
        }

        public static void printParts(List<Part> parts)
        {
            foreach (Part part in parts)
            {
                debug(part.partInfo.name);
            }
        }
    }
}
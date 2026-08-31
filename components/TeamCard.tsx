'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Dribbble } from 'lucide-react';
import { TeamMember } from '../types';
import { Card } from './ui/Card';

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Card className="group flex flex-col h-full bg-surface-card hover:border-indigo-500/30 transition-colors">
      <div className="p-6 flex flex-col items-center text-center space-y-4 h-full justify-between">
        
        {/* Avatar Image */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-indigo-500/20 group-hover:border-indigo-500/60 transition-colors shadow-xl">
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            sizes="128px"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Member Details */}
        <div className="space-y-1.5 w-full">
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
            {member.name}
          </h3>
          <p className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full w-fit mx-auto border border-indigo-500/20">
            {member.role}
          </p>
          <p className="text-white/60 text-xs leading-relaxed pt-2 line-clamp-3">
            {member.bio}
          </p>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap justify-center gap-1.5 w-full pt-1">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded-md border border-white/5"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-surface-border w-full">
          {member.social.github && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name}'s GitHub`}
              className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {member.social.twitter && (
            <a
              href={member.social.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name}'s Twitter`}
              className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name}'s LinkedIn`}
              className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {member.social.dribbble && (
            <a
              href={member.social.dribbble}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name}'s Dribbble`}
              className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Dribbble className="w-4 h-4" />
            </a>
          )}
        </div>

      </div>
    </Card>
  );
}
